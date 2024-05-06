const dragProperties = {
	dragging: false,
	startX: 0,
	startY: 0,
	heldDownTimer: 0,
	positions: {},
	click: false,
};

function calcElementArea(element) {
	const { width, height, x, y } = element.getBoundingClientRect();
	return {
		xMin: x,
		xMax: Math.abs(x + width),
		yMin: y,
		yMax: Math.abs(y + height),
	};
}
/**
 *
 * @param {HTMLElement} elem - element that can be dragged
 * @param {Array[HTMLElement]} snapContainers - array of containers that have children for snip snapping
 * @param {*} onclick
 * @param {*} callback
 * @param {*} onclick_args
 * @param {*} onclick_params
 * @param {*} callback_args
 * @param {*} callback_params
 */
function dragElem(elem, snapContainers, onclick, callback, onclick_args, onclick_params, callback_args, callback_params) {
	const dragTimeout = snapContainers ? 200 : 0;
	elem.onmousedown = (e) => {
		dragProperties.click = true;
		clearTimeout(dragProperties.heldDownTimer);
		dragProperties.heldDownTimer = setTimeout(() => dragMouseDown(e), dragTimeout);
	};
	elem.onmouseup = (e) => {
		clearTimeout(dragProperties.heldDownTimer);
		if (dragProperties.click && onclick) {
			if (onclick_params) {
				onclick(onclick_args, { x: e.clientX, y: e.clientY });
			} else {
				onclick(onclick_args);
			}
		}
	};

	function dragMouseDown(e) {
		e = e || window.event;
		dragProperties.click = false;
		e.preventDefault();
		dragProperties.positions.pos1 = elem.offsetLeft;
		dragProperties.positions.pos2 = elem.offsetTop;
		dragProperties.positions.pos3 = e.x;
		dragProperties.positions.pos4 = e.y;
		elem.style.position = "absolute";
		elem.style.zIndex = "999";
		if (snapContainers) elem.style.boxShadow = "inset 0 0 8px 4px gold, 0 0 8px 6px gold";
		document.onmouseup = closeDragElem;
		document.onmousemove = (e) => elemDrag(e);
	}

	function elemDrag(e) {
		dragProperties.dragging = true;
		e = e || window.event;
		e.preventDefault();
		elem.style.left = `${dragProperties.positions.pos1 + e.x - dragProperties.positions.pos3}px`;
		elem.style.top = `${dragProperties.positions.pos2 + e.y - dragProperties.positions.pos4}px`;
	}

	function closeDragElem(e) {
		document.onmouseup = null;
		document.onmousemove = null;
		let snapped = false;
		if (!snapContainers) return;
		for (const container of snapContainers) {
			console.log(Array.from(container.childNodes));
			Array.from(container.childNodes).forEach((_area, index) => {
				let area = calcElementArea(_area);
				if (e.x >= area.xMin && e.x <= area.xMax && e.y >= area.yMin && e.y <= area.yMax) {
					snapped = true;
					elem.style.position = "absolute";
					elem.style.boxShadow = "";
					if (callback && callback_args && callback_params) {
						resetElemPosition(callback(callback_args, _area));
					}
					return true;
				}
			});
		}
		if (!snapped) {
			elem.style.left = dragProperties.startX + "px";
			elem.style.top = dragProperties.startY + "px";
			elem.style.zIndex = "inherit";
			elem.style.boxShadow = "";
			elem.style.position = "relative";
			resetElemPosition();
		}
	}
}

function resetElemPosition(callback) {
	if (callback) callback();
	//hideHover();
}
