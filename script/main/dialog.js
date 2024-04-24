const textArea = document.querySelector(".text-side");
const nameElem = textArea.querySelector(".name");
const textBox = textArea.querySelector(".text-box");
const textElem = textBox.querySelector(".text");

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

class Dialog {
	constructor() {
		this.id = "dialog";
		this.currentLine = 0;
		this.currentDialog = [];
		this.skip = false;
	}

	advanceDialog() {
		this.currentLine++;
	}

	setDialogScene(scene) {}

	async generateDialog(txt) {
		this.skip = false;
		textElem.textContent = "";
		const parsedText = this.parseTextForDialog(txt);
		console.log(parsedText);
		for (const property of parsedText) {
			const span = document.createElement("span");
			textElem.append(span);
			if (property.color) {
				span.style.color = property.color;
			}
			for (const ltr of property.text) {
				if (!this.skip) await sleep(50);
				span.textContent += ltr;
			}
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
			if (textPart.text) {
				total.push(textPart);
			}
		}
		return total;

		function getFirstPartWithoutTag(list) {
			return list.find((p) => !p.includes("<") && p.trim().length > 0);
		}
	}
}

const dialog = new Dialog();

dialog.parseTextForDialog(english.story_intro_3);
dialog.generateDialog(english.story_intro_3);
