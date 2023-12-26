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
// 정적 파일 서빙 설정 (express.static을 앞쪽으로 이동)
app.use(express_1.default.static(path_1.default.join(__dirname, '../../public'), {
    setHeaders: function (res, path, stat) {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    },
}));
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '../../public/mainPage.html'));
});
app.get('/login', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '../../public/loginPage.html'));
});
app.get('/signup', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '../../public/signupPage.html'));
});
app.get('/admin', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '../../public/adminPage.html'));
});
app.listen(port, function () {
    console.log("Server is running at http://localhost:".concat(port));
});
