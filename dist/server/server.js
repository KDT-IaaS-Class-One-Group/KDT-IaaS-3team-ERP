"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var path_1 = __importDefault(require("path"));
var app = (0, express_1.default)();
var port = 9997;
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../../public')));
app.listen(port, function () {
    console.log("Server is running at http://localhost:".concat(port));
});
