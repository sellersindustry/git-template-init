/*
 *   Copyright (C) 2024 Sellers Industries, Inc.
 *   distributed under the MIT License
 *
 *   author: Evan Sellers <sellersew@gmail.com>
 *   date: Sun Feb 11 2024
 *   file: index.ts
 *   project: SherpaJS Template Module
 *   purpose: Endpoint /example/[id]/
 *
 */


import { Request, Response } from "sherpa-core";
import { Context } from "../../../sherpa.module";


export async function GET(request:Request, context:Context) {
    let id = request.params.path.get("id");
    console.log(id);
    return Response.JSON({ request, context }, { status: 200 });
}


// For the wages of sin is death, but the gift of God is eternal life in
// Christ Jesus our Lord.
// - Romans 6:23
