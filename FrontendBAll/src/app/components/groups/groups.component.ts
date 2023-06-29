import { Group } from 'src/app/models/group';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GroupsService } from 'src/app/services/groups.service';
import { MatPaginator } from '@angular/material/paginator';
import{ ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DtoGroupParticipantsSummary } from 'src/app/models/dtoGroupParticipantsSummary';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent {
  dataSource = new MatTableDataSource<DtoGroupParticipantsSummary>();
  displayedColumns: string[]=["image","name","amountParticipants","description","category","actions"];

  @ViewChild('paginator')
  paginator!: MatPaginator;

  id!: number;

  constructor(private groupService: GroupsService, private activatedRoute:ActivatedRoute) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.loadGroups();
  }

  filterGroups(event: Event) {
   let filtro = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filtro;
  }

  loadGroups(): void {

    this.groupService.getListGroupParticipantsSummary().subscribe({
      next: (data:DtoGroupParticipantsSummary[]) => {

        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;

        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteGroups(id: number):void {
    this.groupService.deleteGroup(id).subscribe({
      next: (data) => {
        this.loadGroups();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
