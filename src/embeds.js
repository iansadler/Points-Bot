const Discord = require('discord.js')

exports.errorEmbed = function (text) {
	return new Discord.MessageEmbed()
		.setColor('#f23535')
		.setTitle('Command Error')
		.setDescription(text)
}

exports.infoEmbed = function (text, title) {
	if (typeof title === 'undefined') {
		title = ''
	}
	return new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle(title)
		.setDescription(text)
}