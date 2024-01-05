import { DiscussionService } from './discussion.service';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject, Subscription } from 'rxjs';
import * as _ from 'lodash'
import { IdiscussionConfig } from '../models/discussion-config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService implements OnInit {

  paramsSubscription: Subscription;
  private _config: IdiscussionConfig;
  public checkContext: boolean;
  public queryParams;
  getContextData: any;
  hasContextData: any;
  getParams: IdiscussionConfig;
  setCategoryId = new ReplaySubject(1)
  categoryId: string
  sidebar: string

  constructor(
    public activatedRoute: ActivatedRoute,
    private discussionService: DiscussionService,
  ) { }

  ngOnInit() {

  }

  setConfig(activatedRoute) {
    activatedRoute.data.subscribe((config) => {
    this._config = config.data;
    });
  }

  setConfigFromParams(activatedRoute) {
    activatedRoute.queryParams.subscribe((params) => {
      const obj: IdiscussionConfig = {
        userId : _.get(params, 'userId'),
        categories : JSON.parse(_.get(params, 'categories')),
        sidebar: _.get(params, 'sidebar')
      };
      this._config = obj;
    });
  }

  setConfigFromWidgetBaseClass(config){
    this._config = config
  }

  public getConfig() {
    return this._config;
  }

  public getCategories() {
    this.getParams = this.getConfig()
    return _.get(this.getParams, 'categories')
  }

  public hasContext() {
    this.hasContextData = this.getCategories() ?
      (this.getCategories().result ? this.getCategories().result.length : null)
      : null
    return this.hasContextData
  }

  public getContext() {
    this.getContextData = this.getCategories() ?
      (this.getCategories().result ? this.getCategories().result : null)
      : null
    return this.getContextData
  }

  setCategoryid(id) {
    this.categoryId = id
    this.setCategoryId.next(id)
  }


  public getHeaderOption() {
    return this._config.headerOptions !== undefined ? this._config.headerOptions : true;
  }

  public getBannerOption() {
    return this._config.bannerOption ? this._config.bannerOption : false;
  }

  public getCategoryid() {
    return this.categoryId
  }

  public getRouterSlug() {
    return this._config.routerSlug ? this._config.routerSlug : '';
  }
}
