export class Download {
	public static async file(url: string, filename: string) {
		const res = await fetch(url);
		const reader = res.body?.getReader();
		const stream = new ReadableStream({
			start(controller) {
				function push() {
					reader?.read().then(({ done, value }) => {
						if (done) {
							controller.close();
							return;
						}
						controller.enqueue(value);
						push();
					});
				}
				push();
			},
		});

		const blob = await new Response(stream).blob();
		const downloadURL = window.URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = downloadURL;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		window.URL.revokeObjectURL(downloadURL);
	}
}
