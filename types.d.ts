export {};

declare global {
  interface Window {
    find?: any;
  }

  interface HTMLElement {
    createTextRange?: () => Range;
  }
  
  interface ChildNode {
    data? : any;
    splitText?: any;
    length?: any;
    deleteData?: any;
  }

  interface Range {
    findText?: any;
    pasteHTML?: any;
  }
}