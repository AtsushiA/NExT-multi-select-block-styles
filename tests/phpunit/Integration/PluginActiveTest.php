<?php
/**
 * Integration tests for plugin activation.
 */

namespace NExT_Multi_Select_Block_Styles\Tests\Integration;

use WP_UnitTestCase;

/**
 * Test case verifying the plugin loads correctly.
 */
class PluginActiveTest extends WP_UnitTestCase {

	/**
	 * Verify the plugin is active.
	 */
	public function test_plugin_is_active(): void {
		$this->assertTrue(
			is_plugin_active( 'next-multi-select-block-styles/next-multi-select-block-styles.php' )
		);
	}
}
