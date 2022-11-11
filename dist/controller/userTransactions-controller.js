var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { createTransaction, findStockInfoById, getTransactionsByUserId, getTransactionsByUserIdWithArray, updateBalanceAfterTransaction, validityOfTransaction, } from '../repository/index.js';
import httpStatus from 'http-status';
export function getTransactions(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userInfo, stockIds, transactions, transactions, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userInfo = res.locals.info;
                    stockIds = (req.query.stockId || '')
                        .split(',')
                        .map(function (str) { return (Number(str) ? Number(str) : 0); })
                        .filter(function (e) { return (e === 0 ? 0 : e); });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    if (!!stockIds[0]) return [3 /*break*/, 3];
                    return [4 /*yield*/, getTransactionsByUserId(userInfo.userId)];
                case 2:
                    transactions = (_a.sent())
                        .rows;
                    return [2 /*return*/, res.status(httpStatus.OK).send(transactions)];
                case 3: return [4 /*yield*/, getTransactionsByUserIdWithArray(userInfo.userId, stockIds)];
                case 4:
                    transactions = (_a.sent()).rows;
                    return [2 /*return*/, res.status(httpStatus.OK).send(transactions)];
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    return [2 /*return*/, res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)];
                case 7: return [2 /*return*/];
            }
        });
    });
}
export function newTransaction(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userInfo, transactionInfo, stockInfo, validityInfo, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userInfo = res.locals.info;
                    transactionInfo = req.body;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, findStockInfoById(transactionInfo.stockId)];
                case 2:
                    stockInfo = (_a.sent())
                        .rows[0];
                    return [4 /*yield*/, validityOfTransaction(userInfo.userId, stockInfo.price)];
                case 3:
                    validityInfo = (_a.sent()).rows[0];
                    if (!validityInfo.isValidTransaction) {
                        return [2 /*return*/, res.sendStatus(httpStatus.UNAUTHORIZED)];
                    }
                    return [4 /*yield*/, createTransaction(userInfo.userId, transactionInfo.stockId, stockInfo.price)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, updateBalanceAfterTransaction(userInfo.userId, validityInfo.newBalance)];
                case 5:
                    _a.sent();
                    return [2 /*return*/, res.sendStatus(httpStatus.OK)];
                case 6:
                    error_2 = _a.sent();
                    return [2 /*return*/, res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)];
                case 7: return [2 /*return*/];
            }
        });
    });
}
