import BooksData from '../../data/json/books.json'
import Literature from '../../data/json/literature.json'
import JavaBooksData from '../../data/json/java.json'
import EmBooksData from '../../data/json/E-M.json'
import Programming from '../../data/json/programming.json'
import GrowthHacking from '../../data/json/growth-hacking.json'
import DataScience from '../../data/json/data-science.json'
import Ai from '../../data/json/ai.json'

/**
 * 获取所有的书籍数据（分类）
 */
export function getBooksData() {
    var books = mergeJson(Literature, EmBooksData)
    books = mergeJson(JavaBooksData, books)
    books = mergeJson(Ai, books)
    books = mergeJson(Programming, books)
    books = mergeJson(GrowthHacking, books)
    books = mergeJson(DataScience, books)
    return mergeJson(BooksData, books)
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