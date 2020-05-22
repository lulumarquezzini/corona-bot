// Run dotenv
require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');
const moment = require('moment');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    const args = msg.content.split(' ');
    const command = args.shift().toLowerCase();
    if( command === '!diarios') {
        const filtro = args[0] === '-o' ? 'todayDeaths' : 'todayCases';
        const url = 'https://disease.sh/v2/countries?sort=' + filtro;
        const getData = async url => {
            try {
            const response = await fetch(url);
            let json = await response.json();
            var exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(filtro === 'todayDeaths' ? 'Mortes do dia :biohazard:' : 'Casos do dia :biohazard:')
            .setDescription(filtro === 'todayDeaths'? '8 países que mais mortes tiveram apenas hoje' : '8 países que mais casos tiveram apenas hoje!')
            .setTimestamp()
            .setFooter('Em progresso by Kiyomin')
            for(var i in json){
                if( i == 8){
                    break;
                }
                let flag = ':flag_' + json[i].countryInfo.iso2.toLowerCase() + ':';

                filtro === 'todayDeaths' ?
                exampleEmbed.addFields(
                    { name: 'País', value: json[i].country + " " + flag, inline: true },
                    { name: 'Óbitos :skull_crossbones:', value: '+' + json[i].todayDeaths, inline: true },
                    { name: 'Casos :fire:', value: '+' + json[i].todayCases,  inline: true },
                )
                :
                exampleEmbed.addFields(
                    { name: 'País', value: json[i].country + " " + flag, inline: true },
                    { name: 'Casos :fire:', value: '+' + json[i].todayCases,  inline: true },
                    { name: 'Óbitos :skull_crossbones:', value: '+' + json[i].todayDeaths, inline: true },
                )
            }
            msg.channel.send(exampleEmbed);
            } catch (error) {
            console.log(error);
            }
        };
        getData(url);
    }
    if(command === '!ajuda'){
        var exampleEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Ajuda botzinho! :biohazard:')
        //.setURL('https://discord.js.org/')
        //.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
        .setDescription('Lista de comandos para você não se perder!')
        //.setThumbnail('https://i.imgur.com/wSTFkRM.png')
        //.setImage('https://i.imgur.com/wSTFkRM.png')
        .setTimestamp()
        .setFooter('Em progresso by Kiyomin')
        exampleEmbed.addFields(
            { name: '!mundo', value: 'Lista a situação atualizada do mundo. Atualizado de 10 em 10 min.'},
            { name: '!estados :UF', value: 'Se você não especificar nenhum estado, lista todos. Caso especifique, mostra detalhes de um só!'},
            { name: '!casos :country', value: 'Lista em ordem os mais atingidos do mundo, caso selecione um país, mostra detalhes deste.'},
            { name: '!obitos', value: 'Mostra os oito primeiros em óbitos, coroninha não é fácil não.'},
            { name:  '!hug', value: 'Tente abraçar alguém e veja o resultado!'},
            { name: '!kokoron', value: 'Afinal, quem não precisa de Kokorons nesses tempos difíceis? (Ou em qualquer tempo) :sunny:'},
            { name: '!cloroquina', value: 'Você é um robô do Bolsonaro :robot:'},
            { name: '!diarios (-o)', value: 'Mostra os países que estão liderando nos casos do dia, com -o, mostra a liderança nos óbitos'}
        )
        msg.channel.send(exampleEmbed);        
    }
    if(command === '!mundo'){
        const url = 'https://disease.sh/v2/all';
        const getData = async url => {
            try {
            const response = await fetch(url);
            let json = await response.json();
            var exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Dados totais Covid-19! :biohazard:')
            //.setURL('https://discord.js.org/')
            //.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
            .setDescription('Panorama geral do mundo! :map:')
            //.setThumbnail('https://i.imgur.com/wSTFkRM.png')
            //.setImage('https://i.imgur.com/wSTFkRM.png')
            .setTimestamp()
            .setFooter('Em progresso by Kiyomin')
            exampleEmbed.addFields(
                { name: 'Países afetados', value: json.affectedCountries, inline: true},
                { name: 'Casos :fire:', value: json.cases +' (+'+json.todayCases+' )', inline: true },
                { name: 'Óbitos :skull_crossbones:', value: json.deaths + ' ( +' + json.todayDeaths+ ' )', inline: true },
                { name: 'Ativos :hospital: ', value: json.active, inline: true},
                { name: 'Estado crítico :crying_cat_face:', value: json.critical, inline: true},
                { name: 'Recuperados :penguin:', value: json.recovered, inline: true}
            )
            msg.channel.send(exampleEmbed);
            } catch (error) {
            console.log(error);
            }
        };
        getData(url);        
    }
    if(command === '!estados'){
        if(args.length > 0){
            const url = 'https://api.coronavairus.com.br/state/last/' + args[0];
            const getData = async url => {
                try {
                    const response = await fetch(url);
                    let json = await response.json();
                    let casos = json.latest;
                    if (Object.keys(json).length === 0){
                        throw "Estado não encontrado, bobão!"
                    }
                    var exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Detalhes de um estado :biohazard:')
                    //.setURL('https://discord.js.org/')
                    //.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
                    .setDescription('Informações mais detalhadas sobre um único estado')
                    //.setThumbnail('https://i.imgur.com/wSTFkRM.png')
                    //.setImage('https://i.imgur.com/wSTFkRM.png')
                    .setTimestamp()
                    .setFooter('Em progresso by Kiyomin')
                    exampleEmbed.addFields(
                        { name: 'Estado', value: json.name, inline: true },
                        { name: 'UF', value: json.uf, inline: true},
                        { name: 'Casos :fire:', value: casos.cases, inline: true },
                        { name: 'Óbitos :skull_crossbones:', value: casos.deaths, inline: true },
                        { name: 'Letalidade :coffin: ', value: ((casos.deaths/casos.cases)*100).toFixed(2) + '%' , inline: true }
                    )
                    msg.channel.send(exampleEmbed);
                } catch (error) {
                    var exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Erro! :biohazard:')
                    //.setURL('https://discord.js.org/')
                    //.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
                    .setDescription(error + " :penguin:")
                    //.setThumbnail('https://i.imgur.com/wSTFkRM.png')
                    //.setImage('https://i.imgur.com/wSTFkRM.png')
                    .setTimestamp()
                    .setFooter('Em progresso by Kiyomin')
                    msg.channel.send(exampleEmbed);
                }
            };
            getData(url);
        }
        else{
            const url = 'https://api.coronavairus.com.br/state/last';
            const getData = async url => {
                try {
                const response = await fetch(url);
                let json = await response.json();
                json.sort(function(a, b){
                    return b.latest.cases - a.latest.cases;
                });
                var exampleEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Ranking por estados do brasil :biohazard:')
                //.setURL('https://discord.js.org/')
                //.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
                .setDescription('8 estados mais afligidos pelo coroninha')
                //.setThumbnail('https://i.imgur.com/wSTFkRM.png')
                //.setImage('https://i.imgur.com/wSTFkRM.png')
                .setTimestamp()
                .setFooter('Em progresso by Kiyomin')
                for(var i in json){
                    if( i == 8){
                        break;
                    }
                    exampleEmbed.addFields(
                        { name: 'Estado :flag_br:', value: json[i].name, inline: true },
                        { name: 'Casos :fire:', value: json[i].latest.cases, inline: true },
                        { name: 'Óbitos :skull_crossbones:', value: json[i].latest.deaths, inline: true },
                    )
                }
                msg.channel.send(exampleEmbed);
                } catch (error) {
                    console.log(error);
                }
            };
            getData(url);
        }
    }
    if(command === '!kokoron'){
        async function fetchJSON(url) {
            const response = await fetch(url);
            let json = await response.json();
            return json.results;
        }
        const url = 'http://bandori.party/api/cards';
        const getData = async url => {
            try {
                const response = await fetch(url);
                let json = await response.json();
                let urls = [];
                const totpage = Math.ceil(json.count/10);
                for(let page = 1; page <= totpage; page++){
                    urls.push(url + "/?page=" + page);
                }
                let promises = urls.map(url => fetchJSON(url));
                Promise.all(promises).then(responses => {
                    let kokorons = [];
                    responses.map(response => {
                        response.map(res => {
                            if(res.member == 16){
                                kokorons.push(res);
                            }
                        })
                    })
                    const Kokoron = kokorons[Math.floor(Math.random() * kokorons.length)];
                    var exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#FFEE22')
                    //.setURL('https://discord.js.org/')
                    //.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
                    //.setDescription(Kokoron.name)
                    //.setThumbnail('https://i.imgur.com/wSTFkRM.png')
                    .setImage(Kokoron.i_rarity > 2 ? Kokoron.art_trained : 'https://i.bandori.party/u/c/art/' + encodeURIComponent(Kokoron.art.replace('https://i.bandori.party/u/c/art/', '')) )
                    .setTimestamp()
                    .setFooter('Em progresso by Kiyomin')
                    exampleEmbed.addFields(
                        { name: 'Title', value: Kokoron.name === null ? '-' : Kokoron.name, inline: true },
                        { name: 'Japanese title', value: Kokoron.japanese_name === null ? '-' : Kokoron.japanese_name, inline: true },
                        { name: 'Rarity', value: ':star:'.repeat(Kokoron.i_rarity), inline: true },
                        { name: 'Attribute', value: Kokoron.i_attribute , inline: true },
                        { name: 'Skill', value: Kokoron.skill_name === null ? '-' : Kokoron.skill_name, inline: true},
                        { name: 'Japanese skill', value: Kokoron.japanese_skill_name === null ? '-' : Kokoron.japanese_skill_name, inline: true}
                    )
                    msg.channel.send(exampleEmbed);
                    
                })

            } catch (error) {
            console.log(error);
            }
        };
        getData(url);
    }
    if(command === '!hug'){
        var exampleEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Abraços estão proibidos, ' + msg.author.username + "!")
        .setImage('https://i.imgur.com/X84T2Ot.gif')
        .setTimestamp()
        .setFooter('Em progresso by Kiyomin')

        msg.channel.send(exampleEmbed);
    }
    if(command === '!cloroquina'){
        msg.channel.send('Cloroquina, Cloroquina' +
        '\n Cloroquina lá no S.U.S' +
        '\n Eu sei que tu me curas' +
        '\n Em nome de Jesus.... :musical_note:');
    }
    if(command === '!obitos'){
        const url = 'https://disease.sh/v2/countries?sort=deaths';
        const getData = async url => {
            try {
            const response = await fetch(url);
            let json = await response.json();
            var exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Ranking de mortes mundial :biohazard:')
            //.setURL('https://discord.js.org/')
            //.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
            .setDescription('8 países que mais mortes tiveram por corona!')
            //.setThumbnail('https://i.imgur.com/wSTFkRM.png')
            //.setImage('https://i.imgur.com/wSTFkRM.png')
            .setTimestamp()
            .setFooter('Em progresso by Kiyomin')
            for(var i in json){
                if( i == 8){
                    break;
                }
                let flag = ':flag_' + json[i].countryInfo.iso2.toLowerCase() + ':';
                exampleEmbed.addFields(
                    { name: 'País', value: json[i].country + " " + flag, inline: true },
                    { name: 'Óbitos :skull_crossbones:', value: json[i].deaths + ' ( +' + json[i].todayDeaths + ' )', inline: true },
                    { name: 'Casos :fire:', value: json[i].cases + ' ( +' + json[i].todayCases + ' )',  inline: true },
                )
            }
            msg.channel.send(exampleEmbed);
            } catch (error) {
            console.log(error);
            }
        };
        getData(url);
    }
    if (command === '!casos') {
        if(args.length > 0){
            const url = 'https://disease.sh/v2/countries/' + args[0];
            const getData = async url => {
                try {
                    const response = await fetch(url);
                    let json = await response.json();
                    if (Object.keys(json).length === 0){
                        throw "País não encontrado, bobão!"
                    }
                    var exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Detalhes de um país :biohazard:')
                    //.setURL('https://discord.js.org/')
                    //.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
                    .setDescription('Informações mais detalhadas sobre um único país')
                    //.setThumbnail('https://i.imgur.com/wSTFkRM.png')
                    //.setImage('https://i.imgur.com/wSTFkRM.png')
                    .setTimestamp()
                    .setFooter('Em progresso by Kiyomin')
                    let flag = ':flag_' + json.countryInfo.iso2.toLowerCase() + ':';
                    exampleEmbed.addFields(
                        { name: 'País', value: json.country + " " + flag, inline: true },
                        { name: 'Casos :fire:', value: json.cases + " ( +" + json.todayCases + " )", inline: true },
                        { name: 'Óbitos :skull_crossbones:', value: json.deaths + " ( +" + json.todayDeaths + " )", inline: true },
                        { name: 'Ativos :hospital: ', value: json.active , inline: true },
                        { name: 'Estado crítico :crying_cat_face:', value: json.critical, inline: true},
                        { name: 'Recuperados :penguin:', value: json.recovered, inline: true },
                        { name: 'Casos por milhão', value: json.casesPerOneMillion, inline: true},
                        { name: 'Mortes por milhão', value: json.deathsPerOneMillion, inline: true},
                        { name: 'Testes :test_tube:', value: json.tests, inline: true}
                    )
                    msg.channel.send(exampleEmbed);
                } catch (error) {
                    var exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Erro! :biohazard:')
                    //.setURL('https://discord.js.org/')
                    //.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
                    .setDescription(error + " :penguin:")
                    //.setThumbnail('https://i.imgur.com/wSTFkRM.png')
                    //.setImage('https://i.imgur.com/wSTFkRM.png')
                    .setTimestamp()
                    .setFooter('Em progresso by Kiyomin')
                    msg.channel.send(exampleEmbed);
                }
            };
            getData(url);
        }
        else {
            const url = 'https://disease.sh/v2/countries?sort=cases';
            const getData = async url => {
                try {
                const response = await fetch(url);
                let json = await response.json();
                var exampleEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Ranking de casos mundial :biohazard:')
                //.setURL('https://discord.js.org/')
                //.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
                .setDescription('8 primeiros coroninhas em ordem')
                //.setThumbnail('https://i.imgur.com/wSTFkRM.png')
                //.setImage('https://i.imgur.com/wSTFkRM.png')
                .setTimestamp()
                .setFooter('Em progresso by Kiyomin')
                for(var i in json){
                    if( i == 8){
                        break;
                    }
                    let flag = ':flag_' + json[i].countryInfo.iso2.toLowerCase() + ':';
                    exampleEmbed.addFields(
                        { name: 'País', value: json[i].country + " " + flag, inline: true },
                        { name: 'Casos :fire:', value: json[i].cases + ' ( +' + json[i].todayCases + ' )', inline: true },
                        { name: 'Óbitos :skull_crossbones:', value: json[i].deaths + ' ( +' + json[i].todayDeaths + ' )', inline: true },
                    )
                }
                msg.channel.send(exampleEmbed);
                } catch (error) {
                console.log(error);
                }
            };
            getData(url);
        }
    }
  });

client.login(process.env.DISCORD_TOKEN);