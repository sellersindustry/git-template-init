/*
 *   Copyright (C) 2024 Sellers Industries, Inc.
 *   distributed under the MIT License
 *
 *   author: Evan Sellers <sellersew@gmail.com>
 *   date: Sun Feb 11 2024
 *   file: index.ts
 *   project: SherpaJS Template Module
 *   purpose: Endpoint /example/
 *
 */


import { Request, Response } from "sherpa-core";
import { Context } from "../../sherpa.module";


export async function GET(request:Request, context:Context) {
    return Response.JSON({ request, context }, { status: 200 });
}


// I can do all this through him who gives me strength.
// - Philippians 4:13
