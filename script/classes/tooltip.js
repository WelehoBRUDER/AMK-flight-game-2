const tooltipBox = document.querySelector(".tooltip-box");
const tooltipText = tooltipBox.querySelector(".text");

class Tooltip {
	constructor(tt) {
		this.marker = tt.marker;
		this.element = tt.element;
		this.text = tt.text;
	}

	create() {
		if (this.marker) {
			this.marker.on("mouseover", (e) => {
				this.show(e.originalEvent);
			});
			this.marker.on("mousemove", (e) => {
				this.move(e.originalEvent);
			});
			this.marker.on("mouseout", () => {
				this.hide();
			});
		} else {
			this.element.addEventListener("mouseover", (e) => {
				this.show(e, this.text);
			});
			this.element.addEventListener("mousemove", this.move);
			this.element.addEventListener("mouseleave", this.hide);
		}
	}

	show(e) {
		tooltipText.textContent = "";
		tooltipBox.style.display = "block";
		tooltipText.textContent = this.text;
		this.move(e);
	}

	move(e) {
		tooltipBox.style.left = `${e.x + 15}px`;
		tooltipBox.style.top = `${e.y - 25}px`;
		if (tooltipBox.offsetLeft + tooltipBox.offsetWidth > innerWidth) {
			tooltipBox.style.left = innerWidth - tooltipBox.offsetWidth - (innerWidth - e.x) + "px";
		}
		if (tooltipBox.offsetTop + tooltipBox.offsetHeight > innerHeight) {
			tooltipBox.style.top = innerHeight - tooltipBox.offsetHeight - (innerHeight - e.y) + "px";
		}
	}

	hide() {
		tooltipText.textContent = "";
		tooltipBox.style.display = "none";
	}
}
