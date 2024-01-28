import { OPERATION } from "../consts/consts.js";
const QUICK_VAULT_COMMANDS = Object.values(OPERATION);

function levenshteinDistance(str1:String, str2:String) {
    const matrix = Array.from({ length: str1.length + 1 }, () => Array(str2.length + 1).fill(0));

    for (let i = 0; i <= str1.length; i++) {
        matrix[i][0] = i;
    }

    for (let j = 0; j <= str2.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= str1.length; i++) {
        for (let j = 1; j <= str2.length; j++) {
            const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;

            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1, // Deletion
                matrix[i][j - 1] + 1, // Insertion
                matrix[i - 1][j - 1] + cost // Substitution
            );
        }
    }

    return matrix[str1.length][str2.length];
}

function commandRecommender(randomString:String) {
    // Function to calculate Levenshtein distance between two strings
    

    // Find the closest command
    //@ts-ignore
    const closestCommand = QUICK_VAULT_COMMANDS.reduce((minDistCmd, command) => {
        const distance = levenshteinDistance(randomString, command);
        return distance < minDistCmd.distance ? { command, distance } : minDistCmd;
    }, { command: null, distance: Infinity });
    //@ts-ignore
    if(closestCommand?.distance<=2){
        //@ts-ignore
       console.log('Did you mean: '+ `"${closestCommand.command}"` + '?');
    }
    
    
}

export default commandRecommender;