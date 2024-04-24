const textBox = document.querySelector(".text-side");
const nameElem = textBox.querySelector(".name");
const textElem = textBox.querySelector(".text");

class Dialog {
	constructor() {
		this.id = "dialog";
		this.currentLine = 0;
		this.currentDialog = [];
		this.skip = false;
	}

	async generateDialog(txt) {
		this.skip = false;
		textElem.textContent = "";
		const parsedText = this.parseTextForDialog(txt);
		console.log(parsedText);
		for (let ltr of txt) {
			await sleep(50);
			textElem.textContent += ltr;
			if (this.skip) {
				break;
			}
		}
		if (this.skip) {
			textElem.textContent = txt;
		}
	}

	parseTextForDialog(txt) {
		const total = [];
		const parts = txt.split("§");
		for (let part of parts) {
			const textPart = {};
			if (part.split("<v>").length > 1) {
				const slices = part.split("<v>");
				const variable = getFirstPartWithoutTag(slices);
				textPart.text = eval(variable);
			}
			if (part.split("<c>").length > 1) {
				const slices = part.split("<c>");
				const color = getFirstPartWithoutTag(slices);
				textPart.color = color;
			}
			if (!textPart.text) {
				const textSlices = part.split(">");
				const _text = getFirstPartWithoutTag(textSlices);
				textPart.text = _text;
			}
			total.push(textPart);
		}
		return total;

		function getFirstPartWithoutTag(list) {
			return list.find((p) => !p.includes("<") && p.length > 0);
		}
	}
}

const dialog = new Dialog();

dialog.parseTextForDialog(english.story_intro_3);
dialog.generateDialog(english.story_intro_3);
