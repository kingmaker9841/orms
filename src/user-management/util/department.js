/**
 * @module Utility
 */

/**
 * @method module:Utility#getSortedItems
 * @param {Object[]} items List of items - must contain {parentId, id, level}
 * @param {Number} parentId 'null' Parent ID field defaults to null
 *
 * @returns The sorted array according to the hierarchy of the items
 */
const getSortedDepartments = (departments, parentId) => {
    const sortedDepts = [];
    if (parentId) {
        const children = departments.filter(d => d.parentId === parentId ? 1 : 0);
        children.forEach(d => {
            sortedDepts.push(d, ...getSortedDepartments(departments, d.id));
        });
    } else {
        const highLevel = departments.filter(d => d.level === 0 ? 1 : 0);
        highLevel.forEach(d => {
            sortedDepts.push(d, ...getSortedDepartments(departments, d.id));
        });
    }
    return sortedDepts;
}

module.exports = {
    getSortedDepartments
}