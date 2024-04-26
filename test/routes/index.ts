/*
 *   Copyright (C) 2024 Sellers Industries, Inc.
 *   distributed under the MIT License
 *
 *   author: Evan Sellers <sellersew@gmail.com>
 *   date: Sun Feb 11 2024
 *   file: index.ts
 *   project: SherpaJS Template Module
 *   purpose: Endpoint /
 *
 */


import { Request, Response } from "sherpa-core";
import { Context } from "../sherpa.module";


export async function GET(request:Request, context:Context) {
    return Response.JSON({ request, context }, { status: 200 });
}


export async function POST(request:Request, context:Context) {
    return Response.JSON({ request, context }, { status: 200 });
}


export async function PUT(request:Request, context:Context) {
    return Response.text("PUT REQUEST");
}


export async function PATCH(request:Request, context:Context) {
    return Response.text("PATCH REQUEST");
}


export async function DELETE(request:Request, context:Context) {
    return Response.new({ status: 200 });
}


// For God so loved the world that He gave His only begotten Son, that whoever
// believes in Him should not perish but have everlasting life.
// - John 3:16
