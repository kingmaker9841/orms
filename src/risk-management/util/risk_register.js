const { RiskRegister, Role, User, DeleteLog } = require('../../config/database');
const PENDING = "Pending";
const DRAFT = "Draft";
const UNAPPROVED = "Unapproved";
const APPROVED = "Approved";
const DELETED = "Deleted";
const moment = require('moment');
/**
 * This function changes the status for the risk register after the action is taken.
 * @method module:RiskRegister#changeStatus
 * @param {Object} role     - Role of the user who has taken the particular action
 * @param {String} action   - Action for the risk event
 * 
 * @returns Status returned according to the role and action taken
 */
function changeStatus(role, action, r, userDetail) {
    switch (action) {
        case "submit":
            if (role.isMaker) {
                return { status: PENDING };
            } else if (role.isChecker) {
                return { status: UNAPPROVED };
            }
            return {};
        case "return":
            if (role.isChecker) {
                return { status: DRAFT };
            } else if (role.isApprover) {
                return { status: PENDING }
            }
            return {};
        case "delete":
            DeleteLog.create({
                deletedItemId : r.id,
                deletedItemType : r.status,
                deletedOn : moment(),
                deletedBy : userDetail.name,
                deletedById : userDetail.id,
            })
            return { status: DELETED };
        case "approve":
            return role.isApprover ? { status: APPROVED } : {};
        default:
            break;
    }
}

/**
 * This method updates the Risk register data for which the certain action is taken.
 * @method module:RiskRegister#updateRegisters
 * @param {Array<Object>} registers - List of risk register event on which the action is taken
 * @param {String} action           - Action taken on the risk register event
 * @param {Object} userDetail       - Detail of the user who has taken the action
 * @returns Updates the risk register list on which the action is taken
 */
async function updateRegisters(registers, action, userDetail) {
    const role = await Role.findOne({ where: { id: userDetail.roleId } });
    return Promise.all(
        registers.map(r => {
            return RiskRegister.update({
                ...changeStatus(role, action, r, userDetail),
                editedBy: userDetail.id,
            }, {
                where: { id: r.id }
            });
        })
    )
}

/**
 * 
 * @method module:RiskRegister#getOptions
 * @param {Object} payload - Payload of the user details 
 * @returns Returns the object for the search criteria according to the role of the user
 */
async function getOptions(payload) {
    options = {};
    const userId = payload.id;
    const user = await User.findOne({
        attributes: ['roleId', 'branchId'],
        where: { id: userId }
    });
    const role = await Role.findOne({
        attributes: ['isMaker', 'isChecker', 'isApprover'],
        where: { id: user.roleId }
    });
    if (role.isMaker) {
        options.status = DRAFT;
        options.createdBy = userId;
    }
    if (role.isChecker) {
        options.status = PENDING;
        options.branchId = user.branchId;
    }
    return options;
}

const updateLossDatabase = (data) => {
    return Promise.all(
      data.map((lD) => {
        RiskRegister.update(
          { 
            isLossDatabaseGenerated : lD.isLossDatabaseGenerated 
          },
          {
            where: {
              id: lD.id,
            },
          }
        );
      })
    );
  };

  const getLossDataCatId = (name)=> {
      if (name === 'people') return 4;
      if (name === 'process') return 5;
      if (name === 'system') return 6;
      if (name === 'external') return 7;
  }

module.exports = {
    updateRegisters,
    getOptions,
    updateLossDatabase,
    getLossDataCatId,
    PENDING,
    DRAFT,
    UNAPPROVED,
    APPROVED,
    DELETED,
}