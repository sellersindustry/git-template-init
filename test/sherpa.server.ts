/**
 * This file is not required to create a SherpaJS module.
 * Only needed to run server locally
 */

import { SherpaJS } from "sherpa-core";
import { Context } from "./sherpa.module";


export default SherpaJS.New.server<Context>({
    context: {
        exampleProperty: "hello world"
    }
});
