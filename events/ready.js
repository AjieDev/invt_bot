
module.exports = class {
    constructor (client) {
        this.client = client;
    }

    
    async run () {

        const client = this.client;
       
        if(!process.argv.includes("--uncache")) await this.client.wait(1000);
        let invites = {};
        let startAt = Date.now();
        this.client.fetching = true;

        await this.client.functions.asyncForEach(this.client.guilds.cache.array(), async (guild) => {
            let i = process.argv.includes("--uncache") ? new Map() : (guild.me.hasPermission("MANAGE_GUILD") ? await guild.fetchInvites().catch(() => {}) : new Map());
            invites[guild.id] = i || new Map();
        });
        this.client.invitations = invites;
        this.client.fetched = true;
        this.client.fetching = false;
console.log("Events Loaded");
        this.client.user.setPresence({ status: "online", activity:{name: `https://dsc.gg/ajidevserver`, type: "PLAYING" }});
        

    }
};

