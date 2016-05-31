/**
 * @file 将for - of 循环翻译成数组的形式
 * @author zongyu(zongyu@baidu.com)
 */

export default function ({template, types: t}) {

    let buildForOfArray = template(`for (var KEY = 0; KEY < ARR.length; KEY++) BODY;`);

    return {

        visitor: {

            ForOfStatement(path) {

                let {node, scope} = path;
                let nodes = [];
                let right = node.right;

                if (!t.isIdentifier(right) || !scope.hasBinding(right.name)) {
                    let uid = scope.generateUidIdentifier('arr');
                    nodes.push(t.variableDeclaration('var', [
                        t.variableDeclarator(uid, right)
                    ]));
                    right = uid;
                }

                let iterationKey = scope.generateUidIdentifier("i");

                let loop = buildForOfArray({
                    BODY: node.body,
                    KEY: iterationKey,
                    ARR: right
                });

                t.inherits(loop, node);
                t.ensureBlock(loop);

                let iterationValue = t.memberExpression(right, iterationKey, true);

                let left = node.left;
                if (t.isVariableDeclaration(left)) {
                    left.declarations[0].init = iterationValue;
                    loop.body.body.unshift(left);
                }
                else {
                    loop.body.body.unshift(t.expressionStatement(t.assignmentExpression('=', left, iterationValue)));
                }

                if (path.parentPath.isLabeledStatement()) {
                    loop = t.labeledStatement(path.parentPath.node.label, loop);
                }

                nodes.push(loop);
                path.replaceWithMultiple(nodes);
            }
        }
    }
}
