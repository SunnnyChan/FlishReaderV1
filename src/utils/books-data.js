import Insight from '../../data/json/insight.json'
import Internet from '../../data/json/internet.json'
import Literature from '../../data/json/literature.json'
import JavaBooksData from '../../data/json/java.json'
import EmBooksData from '../../data/json/E-M.json'
import Programming from '../../data/json/programming.json'
import GrowthHacking from '../../data/json/growth-hacking.json'
import DataScience from '../../data/json/data-science.json'
import DataBase from '../../data/json/db.json'
import Ai from '../../data/json/ai.json'
import MathBooks from '../../data/json/math.json'

/**
 * 获取所有的书籍数据（分类）
 */
export function getBooksData() {
    var books = mergeJson(Literature, EmBooksData)
    books = mergeJson(Insight, books)
    books = mergeJson(Internet, books)
    books = mergeJson(Ai, books)
    books = mergeJson(JavaBooksData, books)
    books = mergeJson(MathBooks, books)
    books = mergeJson(Programming, books)
    books = mergeJson(DataBase, books)
    books = mergeJson(DataScience, books)
    return mergeJson(GrowthHacking, books)
}

function mergeJson(jsonbject1, jsonbject2) {
    var resultJsonObject = []
    for (var attr in jsonbject1) {
        resultJsonObject[attr] = jsonbject1[attr]
    }
    attr = parseInt(attr) + 1
    for (var attr1 in jsonbject2) {
        resultJsonObject[parseInt(attr) + parseInt(attr1)] = jsonbject2[attr1]
    }
    return resultJsonObject
}