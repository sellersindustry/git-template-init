import { CreateModuleInterface, SherpaJS } from "sherpa-core";


export type Context = {
    exampleProperty: string
};


export default SherpaJS.New.module({
    name: "template_name",
    interface: CreateModuleInterface<Context>
});

