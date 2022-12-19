import { CallbackHandlerType } from '../../types/viewTypes';
import BaseView from './base-view';

function createBtnResetSettingTemplate() {
  return `<button class="btn-reset btn-reset--settings" type="reset">Reset settings</button>`;
}

export default class BtnResetSettingsView extends BaseView {
  getTemplate(): string {
    return createBtnResetSettingTemplate();
  }

  setFilterTypeResetSettingsHandler = (callback: CallbackHandlerType) => {
    this.element?.addEventListener('click', callback);
  };
}
