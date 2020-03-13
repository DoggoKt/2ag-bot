const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = "$";
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

bot.on('ready', () => {
console.log("Started up successfuly!");
bot.user.setActivity("domácí úkoly.", {type: "WATCHING"});
})

bot.on('message', message => {
	if (message.content.includes("discord.gg" || "discordapp.com/invite") && message.author.id === "687604050086330378"){
		message.delete();
		message.member.roles.add("687322651886354462"); // "Muted"
		message.channel.send("<@687604050086330378> se znovu pokusil postnout invite, a za odměnu obdržel mute.");
	}
	
	const args = message.content.split(" ").slice(1);
	if (message.content.startsWith(`${prefix}eval`)){
		if (message.author.id !== "460318444487704597") return message.reply("Přístup povolen pouze <@460318444487704597>"); 
		try{
			const code = args.join(" ");
			let evaled = eval(code);
			
			if (typeof evaled !== "string"){
				evaled = require("util").inspect(evaled);
			}
			
			message.channel.send(clean(evaled), {code:"xl"})
		
		} catch (err) {
			message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
		}
	}
	if (message.content.startsWith(`${prefix}submit`)){
		if (message.author.id !== "460318444487704597") return message.reply("Přístup povolen pouze <@460318444487704597>"); 		
		const channel = bot.channels.find(ch => ch.name === args[1] && ch.parent.name === args[0]);
		if (args[0] === "zadání"){
			const title = args[2].replace(/_/gm, String.fromCharCode(32));
			const description = args[3].replace(/\/n/gm, String.fromCharCode(10)).replace(/_/gm, String.fromCharCode(32));
			const due = args[4].replace(/_/gm, String.fromCharCode(32));
			const embed = new Discord.MessageEmbed()
			.setAuthor(channel.topic, bot.user.displayAvatarURL())
			.setColor("#1275ff")
			.setTitle("**Nové Zadání!**")
			.addField("Název Úkolu", title, true)
			.addField("Popis Úkolu", description, true)
			.addField("Termín Odevzdání", due, true)
			.setTimestamp();
			if (args[5] === "false"){
				channel.send(embed);
			} else if (args[5] === "true"){
				channel.send("@everyone", embed);
			} else {
				channel.send("@everyone", embed);
			}
		} else if (args[0] === "řešení") {
			const title = args[2].replace(/_/gm, String.fromCharCode(32));
			const description = args[3].replace(/\/n/gm, String.fromCharCode(10)).replace(/_/gm, String.fromCharCode(32));
			let solution;
			if (args[4]){
				solution = args[4].replace(/\/n/gm, String.fromCharCode(10)).replace(/_/gm, String.fromCharCode(32)) || "viz níže";
			} else {
				solution = "viz níže"
			}
			const embed = new Discord.MessageEmbed()
			.setAuthor(channel.topic, bot.user.displayAvatarURL())
			.setColor("#00941b")
			.setTitle("**Nové Řešení!**")
			.addField("Název Úkolu", title, true)
			.addField("Popis Úkolu", description, true)
			.addField("Řešení", solution, true)
			.setTimestamp();
			if (args[5] === "false"){
				channel.send(embed);
			} else if (args[5] === "true"){
				channel.send("@everyone", embed);
			} else {
				channel.send("@everyone", embed);
			}
		}
	}
	
});


bot.login("Njg3MDI1NjM2NzI4MTExMjA2.XmfyDg.O7T-uPyU_qhtX_5SQ3d30o7A7Ak");