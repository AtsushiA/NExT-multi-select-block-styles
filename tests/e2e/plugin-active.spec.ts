import { test, expect } from '@wordpress/e2e-test-utils-playwright';

test.describe( 'NExT Multi Select Block Styles', () => {
	test( 'プラグインが有効化されている', async ( { admin, page } ) => {
		await admin.visitAdminPage( 'plugins.php' );
		const pluginRow = page.locator( 'tr[data-slug="next-multi-select-block-styles"]' );
		await expect( pluginRow ).toHaveClass( /active/ );
	} );
} );
