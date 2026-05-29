<?php
/**
 * Unit tests for Multi_Select_Block_Styles.
 */

namespace NExT_Multi_Select_Block_Styles\Tests\Unit;

use Brain\Monkey\Functions;
use Yoast\WPTestUtils\BrainMonkey\TestCase;

/**
 * Test case for Multi_Select_Block_Styles class.
 */
class MultiSelectBlockStylesTest extends TestCase {

	/**
	 * Verify the plugin class can be instantiated with mocked WP functions.
	 */
	public function test_class_exists(): void {
		Functions\stubs( array( 'add_action' ) );
		require_once dirname( __DIR__, 3 ) . '/next-multi-select-block-styles.php';
		$this->assertTrue( class_exists( 'Multi_Select_Block_Styles' ) );
	}
}
