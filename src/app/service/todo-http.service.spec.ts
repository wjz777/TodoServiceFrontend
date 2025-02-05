import { TestBed } from '@angular/core/testing';

import { TodoHTTPService } from './todo-http.service';
import { HttpClient } from '@angular/common/http';
import { defer } from 'rxjs';
import { ToDoItem } from 'src/model/ToDoItem';

function asyncData<T>(data:T) {
  return defer(() => Promise.resolve(data))
}

describe('TodoHTTPService', () => {
  let service: TodoHTTPService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'put',
      'post',
      'delete'
    ]);   
    service = new TodoHTTPService(httpClientSpy)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all todoitem when call getall', () => {
    httpClientSpy.get.and.returnValue(asyncData([
      {
        "id": 1,
      "title": 'xianke',
      "description": 'xianke2',
      "isDone": false
      }
    ]))

    service.getAll().subscribe(data => {
      expect(data.length).toEqual(1)
    }
    )
    expect(httpClientSpy.get.calls.count()).toEqual(1)
  });

  it('should create an item when call create', ()=>{
    httpClientSpy.post.and.returnValue(asyncData(
      {
        id: 0,
        title: 'xianke',
        description: 'xianke2',
        isDone: false,
      }
    ))
    service.create('xianke', 'xianke2').subscribe(data=>{
      expect(data.title).toEqual('xianke')
      expect(data.description).toEqual('xianke2')
      expect(data.isDone).toEqual(false)
    })
    expect(httpClientSpy.post.calls.count()).toEqual(1)
    })
    
    it('should delete item when call delete', () => {
      httpClientSpy.delete.and.returnValue(
        asyncData({
          id: 0,
          title: 'xianke',
          description: 'xianke2',
          isDone: false,
        })
      );
      service.delete(0).subscribe((data) => {
        expect(data.id).toEqual(0),
          expect(data.title).toEqual('xianke'),
          expect(data.description).toEqual('xianke2'),
          expect(data.isDone).toEqual(false);
      });
      expect(httpClientSpy.delete.calls.count()).toEqual(1);
    });


    it('should update when call update', ()=>{
      httpClientSpy.put.and.returnValue(asyncData(
        {
          id: 0,
          title: 'xianke',
          description: 'xianke2',
          isDone: true,
        }
      ))
      var item:ToDoItem ={
          id: 0,
          title: 'xianke',
          description: 'xianke2',
          isDone: false,
      }
      service.update(0, item).subscribe(data => {
        expect(data.id).toEqual(0),
        expect(data.title).toEqual('xianke'),
        expect(data.description).toEqual('xianke2'),
        expect(data.isDone).toEqual(true)
      })
      expect(httpClientSpy.put.calls.count()).toEqual(1)
    })


});

