import React from 'react';

const defaults = {
	flexAlignItems: "center",
	flexJustifyContent: "between",
	hr: true,
	textColorClass: "text-primary dark:text-white",
};

function withDefaults(defaults, Component) {
	return (props) => {
		const p = { ...defaults, ...props };
		return <Component {...p} />;
	};
}

export const H1 = withDefaults(defaults, (props) => (
	<>
		<div className={`flex justify-${props.flexJustifyContent} items-${props.flexAlignItems}`}>
			<h1 className={`text-2xl mb-2 font-bold ${props.textColorClass}`}>
				{props.heading}
			</h1>
			{props.children}
		</div>
		{props.hr && <hr className="mb-2 border-t border-primary/80 dark:border-white/80" />}
	</>
));

export const H2 = withDefaults({
	...defaults,
	textColorClass: "text-primary dark:text-primary-light"
}, (props) => (
	<>
		<div className={`flex justify-${props.flexJustifyContent} items-${props.flexAlignItems}`}>
			<h2 className={`text-lg mt-2 mb-2 font-bold ${props.textColorClass}`}>
				{props.heading}
			</h2>
			{props.children}
		</div>
		{props.hr && <hr className="mb-2 border-t border-primary/80 dark:border-primary-light/80" />}
	</>
));

export const H3 = withDefaults({
	...defaults,
	textColorClass: "text-gray-700 dark:text-gray-400",
}, (props) => (
	<>
		<div className={`flex justify-${props.flexJustifyContent} items-${props.flexAlignItems}`}>
			<h3 className={`font-semibold my-2 ${props.textColorClass}`}>
				{props.heading}
			</h3>
			{props.children}
		</div>
		{props.hr && <hr className="mb-2 border-t border-gray-700/80 dark:border-gray-400/80" />}
	</>
));
