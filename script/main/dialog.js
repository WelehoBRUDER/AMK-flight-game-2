const textArea = document.querySelector(".text-side");
const nameElem = textArea.querySelector(".name");
const textBox = textArea.querySelector(".text-box");
const textElem = textBox.querySelector(".text");
const portrait = document.querySelector(".portrait-img");

let lang = english;

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function translate(id) {
	const txt = lang[id];
	return txt ? txt : id;
}

function closeEverything() {
	if (devConsole.open) {
		devConsole.toggle();
	}
}

window.addEventListener("keyup", (e) => {
	if (e.key === "Escape") return closeEverything();
	if (e.key === "§") return devConsole.toggle();
	if (devConsole.open) return;
	// Space key event
	if (e.key === " ") {
		dialog.advanceOrSkipDialog();
	}
});

class Dialog {
	constructor() {
		this.id = "dialog";
		this.currentLine = 0;
		this.currentDialog = [];
		this.reading = false;
		this.skip = false;
	}

	advanceOrSkipDialog() {
		if (this.reading) {
			this.skip = true;
		} else {
			if (this.currentLine === this.currentDialog.length - 1) return;
			this.currentLine++;
			this.setDialogScene(this.currentDialog[this.currentLine]);
		}
	}

	setDialogScene(scene) {
		const char = scene.character;
		const text = translate(scene.text);
		if (!char) {
			nameElem.textContent = translate("narrator");
			nameElem.style.color = "black";
		} else {
			nameElem.textContent = translate(char.id);
			nameElem.style.color = char.color;
		}
		if (!char || !char.image) {
			portrait.src = "/images/unknown.png";
		} else {
			portrait.src = `/images/${char.image}`;
		}
		this.generateDialog(text);
	}

	setFullDialog(fDialog) {
		this.currentLine = 0;
		this.currentDialog = fDialog;
		this.setDialogScene(this.currentDialog[this.currentLine]);
	}

	async generateDialog(txt) {
		this.skip = false;
		this.reading = true;
		textElem.textContent = "";
		const parsedText = this.parseTextForDialog(txt);
		const wrapper = document.createElement("span");
		textElem.append(wrapper);
		for (const property of parsedText) {
			const span = document.createElement("span");
			wrapper.append(span);
			if (property.color) {
				span.style.color = property.color;
			}
			for (const ltr of property.text) {
				if (!this.skip) await sleep(25);
				span.textContent += ltr;
			}
		}
		this.reading = false;
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
			return list.find((p) => !p.includes("<") && p.length > 0);
		}
	}
}

const dialog = new Dialog();

dialog.setFullDialog(dialogScenes.intro);
