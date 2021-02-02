module.exports.getMapStructure = (items, parentId, selectedItemId) => {
    try {
        let items = [];
        const children = items.filter(childItem => {
            if (childItem.parentCategoryId === parentId) {
                return 1;
            }
            return 0;
        });
        children.forEach(row => {
            let padding = "";
            let level = row.level;
            while (level-- > 0) {
                padding += "---";
            }
            let selected = false;
            if (selectedItemId) {
                selected = row.name === selectedItemId.parentCategory
            }
            items.push(
                <option key={row.id} value={row.name} selected={selected}>{padding + " " + row.name}</option>
            );
            items.push(getMapStructure(items, row.id, selectedItemId));
        })
        return items;
    } catch (err) {
        return null;
    }
}