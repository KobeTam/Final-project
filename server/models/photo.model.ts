export interface PhotoProps {
  id?: number;
  filename: string;
  filepath: string;
  mimetype: string;
  size: number;
}

export class Photo implements PhotoProps {
  id?: number;
  filename: string;
  filepath: string;
  mimetype: string;
  size: number;

  constructor(props: PhotoProps) {
    this.id = props.id;
    this.filename = props.filename;
    this.filepath = props.filepath;
    this.mimetype = props.mimetype;
    this.size = props.size;
  }
}
