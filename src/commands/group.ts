import { findWolfeRoot } from "../lib/utility.js";
import { writeTemplate } from "../lib/templates.js";
import { linkGroupRouter } from "../lib/groups.js";

export const group = async (args: string[]) => {
    if (args.length == 0) {
        console.log("Please provide a group name");
        return;
    }

    const groupName = args[0];

    console.log(`Creating group ${groupName}...`);

    const wolfeRoot = findWolfeRoot();
    writeTemplate("../../templates/group", `${wolfeRoot}/src/routes/${groupName}`, groupName, false);

    console.log('Updating routes...');
    linkGroupRouter(`${wolfeRoot}/src/routes/router.ts`, groupName);

    console.log("Done!");
};