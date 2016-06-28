declare var luminolComponent;

luminolComponent = function(LuminolComponent) {
	new LuminolComponent()

		.loadStyle()

		.loadTemplate(
			function(){/*
				<span>zzzzzzzzzzzzzzz</span>
			*/}
		)

		.whenCreated( () => {

		})

		.whenAttached( () => {

		})

		.whenDetached( () => {

		})

		.whenAttributeChanged( () => {

		})

		.register("teste")
	;

};
