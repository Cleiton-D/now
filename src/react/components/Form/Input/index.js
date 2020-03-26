import React from 'react';
import { Form, Input as AntInput } from 'antd';

const { Item } = Form;
const { TextArea } = AntInput;

export default function Input({ textArea, rows, ...rest }) {
	return (
		<Item {...rest}>{textArea ? <TextArea rows={rows} /> : <AntInput />}</Item>
	);
}
