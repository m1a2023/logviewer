/**
 * Default colors for application;
 */
export type EColors = "dark" | "light";

/**
 * Class that manipulates Application's color theme;
 * By default it use system color theme;
 */
export class ApplicationTheme {
	private _color!: EColors;
	private _onChange: ((color: EColors) => void)[] = [];

	constructor(color?: EColors) {
		this.color = color;
		this.addEventListener();
		this.applyTheme();
	}

	private set color(color: EColors | undefined) {
		const resolve = color ?? this.getPreferedTheme();
		if (this._color == resolve) return;
		this._color = resolve;
		this._onChange.forEach((fn) => fn(this._color));
	}

	private getPreferedTheme(): EColors {
		if (
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		) {
			return "dark";
		} else return "light";
	}

	private applyTheme(): void {
		this.getHTML().setAttribute("data-bs-theme", this._color);
	}

	private addEventListener(): void {
		window
			.matchMedia("(prefers-color-scheme: dark)")
			.addEventListener("change", () => {
				this.update();
			});
	}

	private update(color?: EColors): void {
		this.color = color;
	}

	private getHTML(): HTMLElement {
		return document.documentElement;
	}

	public getColor(): EColors {
		return this._color;
	}

	public setColor(color: EColors): void {
		this._color = color;
	}

	public onChange(fn: (color: EColors) => void) {
		this._onChange.push(fn);
	}
}
