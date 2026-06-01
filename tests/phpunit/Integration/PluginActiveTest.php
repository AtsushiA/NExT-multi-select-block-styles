<?php
/**
 * Integration tests for plugin loading.
 */

namespace NExT_Multi_Select_Block_Styles\Tests\Integration;

use WP_UnitTestCase;

/**
 * Test case verifying the plugin loads and hooks correctly.
 */
class PluginActiveTest extends WP_UnitTestCase {

	/**
	 * Verify the plugin class was loaded.
	 */
	public function test_plugin_class_exists(): void {
		$this->assertTrue( class_exists( 'Multi_Select_Block_Styles' ) );
	}

	/**
	 * Verify the enqueue_block_editor_assets action hook is registered.
	 */
	public function test_editor_assets_hook_registered(): void {
		$this->assertGreaterThan(
			0,
			has_action( 'enqueue_block_editor_assets', array( new \Multi_Select_Block_Styles(), 'enqueue_editor_assets' ) ),
			'enqueue_block_editor_assets hook should be registered.'
		);
	}
}
