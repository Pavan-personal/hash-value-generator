"use strict";

import crypto from "crypto";

export async function GET(req: any) {
  try {
    const url = new URL(req.url);
    // console.log(req);
    const encoding : any = url.searchParams.get('encoding');
    console.log(typeof(encoding));
    const param = url.pathname.slice('api/hash/'.length+1);
    const hash = crypto.createHash('sha256').update(param).digest(encoding);
    return Response.json({
      message: "Welcome to hash generator",
      param: param,
      query: encoding,
      hash: hash,
    });
  } catch (error) {
    console.log(error);
  }
}
