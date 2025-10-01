export interface SingleFileProps {
	file: File;
}

export interface MultipleFileProps {
	files: File[];
}

export interface FileCaptureProps {
	capture: (initialState: File[] | (() => File[])) => void;
}
