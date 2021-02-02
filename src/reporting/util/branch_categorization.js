const {
    BranchScore,
    RiskArea,
    RiskEstimationHO,
    RiskCategorization,
    RiskEscalationFunction,
    ReportDownload,
    BranchCategorization,
} = require('../../config/database');
const XLSX = require('xlsx');
const _ = require('lodash');
const { getBranches, associateBranches } = require('../../user-management/util/branches');

function getOneStepUp(initial, categorizations) {
    const categorizationsSorted = _.orderBy(categorizations, 'lowerLimit', 'asc');
    const indexOfInitial = _.findIndex(categorizationsSorted, { id: Number(initial.id) });
    const newIndex = indexOfInitial < categorizations.length - 1 ? indexOfInitial + 1 : indexOfInitial;
    return categorizationsSorted[newIndex];
}

function getEscalatedCategory(categorizationArr, escalations, categorizations) {
    if (categorizationArr.length === 0) {
        return {};
    } else {
        console.log("categorizationArr", categorizationArr);
        const grouped = _(categorizationArr)
            .groupBy('id')  //Categorization ID
            .map((arr, id) => ({
                id,
                name: arr[0].name,
                lowerLimit: arr[0].lowerLimit,
                count: _.map(arr, 'riskAreaId').length,
            }))
            .value();
        // console.log("grouped ", grouped);
        const max = _.maxBy(grouped, 'count');
        const count = max.count;
        const screening = _.find(grouped, { 'count': count });
        const isMultiple = _.findLast(grouped, { 'count': count }).id !== screening.id;
        const result = isMultiple ? getOneStepUp(screening, categorizations) : screening;
        return {
            screening: screening,
            result: result,
        };
    }
}

async function getBranchCategorizationData(options) {
    console.log("options ", options);
    const startDate = new Date(options.startDate);
    console.log("startDate ", startDate);
    const riskAreas = await RiskArea.findAll({ where: { isDeleted: false, isActive: true }, order: [['code', 'ASC']] });
    const count = await BranchScore.findOne({ where: { startDate: startDate } });
    if (count) {
        BranchScore.hasOne(RiskEstimationHO, { foreignKey: 'riskAreaId', sourceKey: 'riskAreaId' });
        RiskEstimationHO.belongsTo(BranchScore, { foreignKey: 'riskAreaId', sourceKey: 'riskAreaId' });
        const [branches, categorizations, escalations] = await Promise.all([
            associateBranches(
                await getBranches(),
                await BranchScore.findAll({
                    where: {
                        isDeleted: false,
                        startDate: startDate,
                    },
                    include: {
                        model: RiskEstimationHO,
                        required: false,
                    },
                    order: [['riskAreaCode', 'ASC']]
                }),
                "branch_scores",
            ),
            RiskCategorization.findAll({ order: [['lowerLimit', 'ASC']] }),
            RiskEscalationFunction.findAll({ raw: true }),
        ]);
        const editedBranches = [];
        for (branch of branches) {
            // console.log("branch", branch);
            const scores = branch.branch_scores;
            // console.log("scores ", scores);
            const categorizationArr = [];
            let scoreSum = 0;
            for (score of scores) {
                // console.log("score ", JSON.parse(JSON.stringify(score)));
                const riskScore = score[options.score];
                // console.log("riskScore ", riskScore );
                const weight = score.risk_estimation_ho.weight;
                const weightedRisk = riskScore * weight / 100;
                scoreSum += weightedRisk;
                const category = _.findLast(categorizations, (o) => {
                    // console.log("o ",o);
                    return o.lowerLimit <= riskScore;
                });
                // console.log("category ", category);
                const categorization = {
                    id: category.id,
                    name: category.name,
                    riskAreaId: score.riskAreaId,
                    riskAreaCode: score.riskAreaCode,
                    lowerLimit: category.lowerLimit,
                };
                categorizationArr.push(categorization);
                // console.log("categorizationArr ", categorizationArr.length);
            }

            // Sorted in Ascending so first item will be the min category
            const minCategory = categorizations[0];
            // console.log("minCategory ", JSON.parse(JSON.stringify(minCategory)));
            for (riskArea of riskAreas) {
                const isAvailable = _.find(categorizationArr, { riskAreaId: riskArea.id });
                if (!isAvailable) {
                    categorizationArr.push({
                        id: minCategory.id,
                        name: minCategory.name,
                        riskAreaId: riskArea.id,
                        riskAreaCode: riskArea.code,
                        lowerLimit: minCategory.lowerLimit,
                    });
                }
            }

            const initialCategory = _.findLast(categorizations, (o) => {
                return o.lowerLimit <= scoreSum && o.upperLimit >= scoreSum
            });
            // console.log("initialCategory ", JSON.parse(JSON.stringify(initialCategory)));
            const categorizedDataForABranch = {
                id: branch.id,
                name: branch.name,
                categorizationArr: categorizationArr,
                initial: initialCategory,
                ...getEscalatedCategory(categorizationArr, escalations, categorizations),
            };
            // console.log("id ", branch.id);
            // console.log("name ", branch.name);
            // console.log("categorizationArr ", categorizationArr);
            // console.log("initialCategory ")
            if (categorizationArr.length > 0) {
                categorizedDataForABranch.final =
                    categorizedDataForABranch.initial.lowerLimit > categorizedDataForABranch.result.lowerLimit
                        ? categorizedDataForABranch.initial : categorizedDataForABranch.result;
            }
            editedBranches.push(categorizedDataForABranch);
        }
        return editedBranches;
    } else {
        return [];
    }
}

async function getBranchCategorization(options) {
    const [actual, previous, estimated] = await Promise.all([
        getBranchCategorizationData({ ...options, score: 'actualRiskScore' }),
        // getBranchCategorizationData({ ...options, score: 'previousRiskScore' }),
        // getBranchCategorizationData({ ...options, score: 'estimatedRiskScore' }),
    ]);
    return {
        actual, previous, estimated,
    }
}

function getBranchCategorySheet(branches) {
    const output = [
        [
            "S.N.", "Branch Name",
            ...(branches[0].categorizationArr ? branches[0].categorizationArr.map((c, i) => i + 1) : []),
            "Initial", "Screening", "Final", "Result"
        ],
    ];
    let SNo = 1;

    for (item of branches) {
        output.push([
            SNo,
            item.name,
            ...(item.categorizationArr ? item.categorizationArr.map(c => c.name) : []),
            item.initial ? item.initial.name : '',
            item.screening ? item.screening.name : '',
            item.result ? item.result.name : '',
            item.final ? item.final.name : ''
        ]);
        SNo++;
    }
    return output;
}

async function createBranchCategorization(data) {
    const workbook = XLSX.utils.book_new();

    const actualData = await getBranchCategorySheet(data.actual);
    const wsBranchCategoryActual = XLSX.utils.aoa_to_sheet(actualData);
    XLSX.utils.book_append_sheet(workbook, wsBranchCategoryActual, "Actual");

    const previousData = await getBranchCategorySheet(data.previous);
    const wsBranchCategoryPrevious = XLSX.utils.aoa_to_sheet(previousData);
    XLSX.utils.book_append_sheet(workbook, wsBranchCategoryPrevious, "Previous");

    const estimatedData = await getBranchCategorySheet(data.estimated);
    const wsBranchCategoryEstimated = XLSX.utils.aoa_to_sheet(estimatedData);
    XLSX.utils.book_append_sheet(workbook, wsBranchCategoryEstimated, "Estimated");


    const fileName = new Date().toJSON().slice(0, 10) + "-" + Date.now() + ".xlsx";
    const pathName = "reports/branch-categorization/" + fileName;
    XLSX.writeFile(workbook, pathName);

    ReportDownload.create({
        branchId: 0,
        type: "branch-categorization",
        startDate: data.startDate,
        path: pathName,
    });

    return { path: pathName };
}

async function saveBranchCategorization(data) {
    const startDate = data.startDate;
    const count = await BranchCategorization.findAll({ where: { startDate: new Date(startDate) } });
    if (count.length === 0) {
        for (let i = 0; i < data.actual.length; i++) {
            const actual = data.actual[i];
            const previous = data.previous[i];
            const estimated = data.estimated[i];
            const obj = {
                branchId: actual.id,
                startDate: startDate,
                actual: actual.screening ? actual.screening.name : '',
                previous: previous.screening ? previous.screening.name : '',
                estimated: estimated.screening ? estimated.screening.name : '',
            }
            if (obj.actual !== '') {
                BranchCategorization.create(obj);
            }
        }
        return { message: "Saved!" };
    } else {
        return { message: "You cannot perform this action!" };
    }
}

module.exports = {
    getBranchCategorization,
    createBranchCategorization,
}