import {TestBed} from '@angular/core/testing';

import {ApiRestGenericLibService, SearchField} from './api-rest-generic-lib.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ResponseApi} from './models/response-api';

class TestData {
  name: string;
  firstName: string;
  id: number;

}

describe('ApiRestGenericLibService', () => {

  let httpTestingController: HttpTestingController;

  beforeEach(() => {


      TestBed.configureTestingModule({
        providers: [ApiRestGenericLibService],
        imports: [HttpClientTestingModule]
      });

      httpTestingController = TestBed.get(HttpTestingController);
    }
  );

  afterEach(() => {
    httpTestingController.verify();
  });

  describe(':', () => {

    function setup() {
      // We inject our service (which imports the HttpClient) and the Test Controller
      let service: ApiRestGenericLibService<TestData>;
      service = TestBed.get(ApiRestGenericLibService);
      service.url = 'http://localhost/data';
      return {service};
    }


    it('should be created', () => {

      const {service} = setup();
      expect(service).toBeTruthy();
    });

    it('getById', () => {

      const {service} = setup();

      const mockTest: TestData = {
        name: 'Bob',
        firstName: 'Anna',
        id: 5
      };

      service.getById(5)
        .subscribe((data: TestData) => {
          expect(data.name).toEqual(mockTest.name);
        });

      const req = httpTestingController.expectOne('http://localhost/data/5');

      expect(req.request.method).toEqual('GET');

      req.flush(mockTest);
    });

    it('getByUrl', () => {

      const {service} = setup();

      const mockTest: TestData = {
        name: 'Bob',
        firstName: 'Anna',
        id: 5
      };

      service.get('http://localhost/data/5')
        .subscribe((data: TestData) => {
          expect(data.name).toEqual(mockTest.name);
        });

      const req = httpTestingController.expectOne('http://localhost/data/5');

      expect(req.request.method).toEqual('GET');

      req.flush(mockTest);
    });

    it('list', () => {

      const {service} = setup();

      const mockTestData: TestData = {
        name: 'Bob',
        firstName: 'Anna',
        id: 5
      };

      const mockResponseApi: ResponseApi<TestData> = {
        count: 1,
        next: null,
        previous: null,
        results: [
          mockTestData
        ]
      };

      service.list()
        .subscribe((data: ResponseApi<TestData>) => {
          expect(data.results[0].name).toEqual(mockTestData.name);
        });

      const req = httpTestingController.expectOne('http://localhost/data');

      expect(req.request.method).toEqual('GET');

      req.flush(mockResponseApi);
    });

    it('post', () => {

      const {service} = setup();

      const mockTest: TestData = {
        name: 'Bob',
        firstName: 'Anna',
        id: 5
      };

      service.post(mockTest)
        .subscribe((data: TestData) => {
          expect(data.name).toEqual(mockTest.name);
        });

      const req = httpTestingController.expectOne('http://localhost/data');

      expect(req.request.method).toEqual('POST');

      req.flush(mockTest);
    });

    it('patch', () => {

      const {service} = setup();

      const mockTest: TestData = {
        name: 'Bob',
        firstName: 'Anna',
        id: 5
      };

      service.patch('http://localhost/data/5', mockTest)
        .subscribe((data: TestData) => {
          expect(data.name).toEqual(mockTest.name);
        });

      const req = httpTestingController.expectOne('http://localhost/data/5');

      expect(req.request.method).toEqual('PATCH');

      req.flush(mockTest);
    });

    it('delete', () => {

      const {service} = setup();

      service.delete('http://localhost/data/5')
        .subscribe(data => {
          expect(data).toBeNull();
        });

      const req = httpTestingController.expectOne('http://localhost/data/5');

      expect(req.request.method).toEqual('DELETE');

      req.flush(null);
    });

    it('search', () => {

      const {service} = setup();

      const mockTestData: TestData = {
        name: 'Bob',
        firstName: 'Anna',
        id: 5
      };

      const mockResponseApi: ResponseApi<TestData> = {
        count: 1,
        next: null,
        previous: null,
        results: [
          mockTestData
        ]
      };

      const search: SearchField = {
        name: 'Bob'
      };

      service.search(search)
        .subscribe((data: ResponseApi<TestData>) => {
          expect(data.results[0].name).toEqual(mockTestData.name);
        });

      const req = httpTestingController.expectOne(
        'http://localhost/data?name=Bob');

      expect(req.request.method).toEqual('GET');

      req.flush(mockResponseApi);
    });
  });
});
