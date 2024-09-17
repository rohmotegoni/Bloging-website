"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatebloginput = exports.createbloginput = exports.signininput = exports.signupinput = void 0;
const zod_1 = require("zod");
exports.signupinput = zod_1.z.object({
    email: zod_1.z.string().email().min(2),
    password: zod_1.z.string().min(8),
    name: zod_1.z.string().optional(),
});
exports.signininput = zod_1.z.object({
    email: zod_1.z.string().email().min(2),
    password: zod_1.z.string().min(8),
});
exports.createbloginput = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
});
exports.updatebloginput = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    id: zod_1.z.number(),
});
