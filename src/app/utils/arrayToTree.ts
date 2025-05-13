// 定义一个数据转化接口
interface MiddleMap<T extends { [key: string]: any }, V extends { [key: string]: any }> {
    (object: T): V & { children: V[] };
}

// 定义一个泛型函数，用于将数组转换为树形结构
function arrayToTree<T extends { [key: string]: any }, V extends { [key: string]: any }>(
    data: T[],
    rootId: string | number,
    idKey: keyof T = 'id' as keyof T,
    parentIdKey: keyof T = 'parentId' as keyof T,
    mapFunction: MiddleMap<T, V>
): V[] {
    const nodeMap = new Map<string | number, V & { children: V[] }>();
    const tree: (V & { children: V[] })[] = [];

    // 首先将所有节点存入 Map 中，并添加 children 属性
    data.forEach(item => {
        const newNode = { ...item, children: [] };
        nodeMap.set(item[idKey], mapFunction(newNode));
    });

    // 构建树形结构
    data.forEach(item => {
        const node = nodeMap.get(item[idKey]);
        const parentId = item[parentIdKey];

        if (parentId === rootId) {
            tree.push(node as V & { children: V[] });
        } else {
            const parentNode = nodeMap.get(parentId);
            if (parentNode) {
                parentNode.children.push(node as V & { children: V[] });
            }
        }
    });

    return tree;
}

export default arrayToTree;
