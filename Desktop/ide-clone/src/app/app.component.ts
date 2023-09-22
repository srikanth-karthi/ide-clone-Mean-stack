import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CompilerService } from './compiler.service';

const defaults = {
  javascript: `print('Hello World');`,
  'text/typescript': `
  print('Hello World');
  `,
  'text/x-java': `class Main
{
  public static void main(String[] args) 
  {
    System.out.println("Hello World");
  }
}`,
  none: 'welcome to my Online compiler',
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private toastr: ToastrService,
    private compiler: CompilerService
  ) { }
   filetype: any;
  i!: boolean;
  data: any = null;
  code: any=defaults.none;
  output: any;
  readOnly = false;
  mode: keyof typeof defaults = 'none';
  options = {
    lineNumbers: true,
    mode: this.mode,
  };
  defaults = defaults;
  clear() {
    this.output = '';
  }

  download()
  {
    const data = this.code
    if(this.mode!='none' )
{
   
  if(this.mode=='javascript')
  {
    this.filetype='js'
  }
  else if(this.mode=='text/typescript'){
    this.filetype='ts'
  }
  else if(this.mode=='text/x-java'){
    this.filetype='java'
  }
  
    // Create a Blob containing the data
    const blob = new Blob([data], { type: 'text/plain' });

    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
   
    a.download = `Main.${this.filetype}`; // Specify the desired file name

    // Trigger a click event on the link to start the download
    a.click();

    // Clean up by revoking the Blob URL
    window.URL.revokeObjectURL(url);
}
  }
  run() {
    if (this.mode == 'none') {
      this.toastr.warning('choose any language', 'Warning');
      return;
    }
    this.i = true;
    this.compiler.getoutput(this.code, this.mode).subscribe(
      (response) => {
        console.log(response);
        this.output = response;
        this.i = false;
      },
      (error) => {
        console.log(error);
        this.i = false;
        this.output = error;
      }
    );
  }
  changeMode(): void {
    this.options = {
      ...this.options,
      mode: this.mode,
    };
    this.code = defaults[this.mode];
  }
}
