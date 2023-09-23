import { findWolfeRoot } from "../lib/utility.js";
import { writeTemplate } from "../lib/templates.js";

export const group = async (args: string[], createRootGroup: boolean = false) => {
    if (args.length == 0 && !createRootGroup) {
        console.log("Please provide a group name");
        return;
    }

    const groupName = createRootGroup ? args[0] : '';

    if (createRootGroup) {
        console.log('Creating root group...');
    } else {
        console.log(`Creating group ${groupName}...`);
    }

    const wolfeRoot = findWolfeRoot();
    writeTemplate("../../templates/group", `${wolfeRoot}/src/routes/${groupName}`, groupName, false);

    console.log('Updating routes...');
    
    console.log("Done!");
};