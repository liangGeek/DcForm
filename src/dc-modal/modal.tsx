import { Modal } from 'antd';
import ReactDOM from 'react-dom';
import React from 'react';
import { ModalProps } from 'antd/lib/modal';
import { FunctionComponent } from 'react';

export interface RcModalProps {
  onOk: (res?: any) => void;
  onCancel: (res?: any) => void;
}

export interface ModalConfig extends ModalProps {
  component: FunctionComponent;
  props?: any;
}

export default function open(config: ModalConfig) {
  const container = document.createDocumentFragment();
  let currentConfig = { ...config, onCancel, onOk, visible: true } as any;

  function destroy() {
    ReactDOM.unmountComponentAtNode(container);
  }

  function render(config: ModalConfig) {
    setTimeout(() => {
      const Component: FunctionComponent = config.component;
      const contentProps = { onOk, onCancel, ...config.props };
      ReactDOM.render(
        <Modal {...config}>{Component && <Component {...contentProps} />}</Modal>,
        container,
      );
    });
  }

  function close() {
    currentConfig = {
      ...currentConfig,
      visible: false,
      afterClose: () => {
        config.afterClose?.();
        destroy();
      },
    };
    render(currentConfig);
  }

  function onCancel(args: any) {
    config.onCancel?.(args);
    close();
  }

  function onOk(args: any) {
    config.onOk?.(args);
    close();
  }

  render(currentConfig);
}
