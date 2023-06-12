import { Component, OnInit } from '@angular/core';
import { Job, JobsService } from '../jobs.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  pageCount: number = 2;
  page: number = 0;
  jobs: Job[] = new Array<Job>();
  total: number = 0;
  five!: string;
  ten!: string;
  fifteen!: string;
  state: string = ''

  previousDisabled: boolean = true;
  nextDisabled: boolean = false;

  constructor(private _jobsService: JobsService){}

  ngOnInit(): void {
    this._jobsService.getTotalJobs(this.state).subscribe({
      next: (total) => {
         this.total = total;
         if (total <= this.pageCount) {
          this.previousDisabled = true;
          this.nextDisabled = true;
        }
      }
    })
    this._jobsService.getJobs(this.pageCount, this.page, this.state).subscribe({
      next: (jobs) => {
         this.jobs = jobs;
      }
    })
  }

  pageCountChanged() {
    this.page = 0;
    this._jobsService.getTotalJobs(this.state).subscribe({
      next: (total) => {
         this.total = total;
         this.resetPaging(total);
      }
    })
    this._jobsService.getJobs(this.pageCount, this.page, this.state).subscribe({
      next: (jobs) => {
          this.jobs = jobs;
      }
    })
  }

  stateChanged() {
    this.page = 0;
    this._jobsService.getTotalJobs(this.state).subscribe({
      next: (total) => {
         this.total = total;
         this.resetPaging(total);
      }
    })
    this._jobsService.getJobs(this.pageCount, this.page,  this.state).subscribe({
      next: (jobs) => {
          this.jobs = jobs;
      }
    })
  }

  display(count: number) {
    this.page += count;
    if(this.page < 0) {
      this.page = 0;
      this.previousDisabled = true;
      this.nextDisabled = false;
      return;
    }
    
    let offset = this.pageCount * this.page;
    console.log(this.page + "--" +this.total / this.pageCount);
    this._jobsService.getJobs(this.pageCount, offset, this.state).subscribe({
      next: (jobs) => { 
        this.jobs = jobs;
        this.disabledPaging();
      }
    })
  }

  disabledPaging() {
    if(this.page >= (this.total / this.pageCount) - 1) {
      this.previousDisabled = false;
      this.nextDisabled = true;
    }else if(this.page == 0) {
      this.previousDisabled = true;
      this.nextDisabled = false;
    } else {
      this.previousDisabled = false;
      this.nextDisabled = false;
    }
  }

  resetPaging(total: number) {
    if (total <= this.pageCount) {
      this.previousDisabled = true;
      this.nextDisabled = true;
    } else {
      this.previousDisabled = true;
      this.nextDisabled = false;
    }
    
  }
}
