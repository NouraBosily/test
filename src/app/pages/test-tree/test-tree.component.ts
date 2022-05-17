import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-test-tree',
  templateUrl: './test-tree.component.html',
  styleUrls: ['./test-tree.component.scss']
})
export class TestTreeComponent implements OnInit {

  list=[{ 'sec': 1, 'id': 43, 'name': 'قطاع شئون المصلحة' },
  { 'sec': 2, 'id': 44, 'name': 'قطاع التخطيط الاستراتيجي والمبادرات' },
  { 'sec': 3, 'id': 45, 'name': 'قطاع التكنولوجيا' },
  { 'sec': 4, 'id': 46, "name": 'قطاع الأمن والخدمات المالية والإدارية' },
  { 'sec': 5, 'id': 47, 'name': 'قطاع الموارد البشرية وبناء القدرات' },
  { 'sec': 6, 'id': 48, 'name': 'قطاع الالتزام التجاري' },
  { 'sec': 7, 'id': 49, 'name': 'قطاع النظم والإجراءات الجمركية' },
  { 'sec': 8, 'id': 50, "name": 'قطاع العمليات الجمركية' }
  ]
  constructor() { }

  ngOnInit() {
  }

}
