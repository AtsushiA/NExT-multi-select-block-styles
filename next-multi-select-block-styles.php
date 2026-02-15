<?php
/**
 * Plugin Name: NExT Multi Select Block Styles
 * Description: ブロックエディタのスタイル選択を複数選択可能にします。
 * Version: 1.0.1
 * Author: NExT-Season
 * Author URI: https://next-season.net
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: next-multi-select-block-styles
 */

if (!defined('ABSPATH')) {
    exit;
}

class Multi_Select_Block_Styles {

    public function __construct() {
        add_action('enqueue_block_editor_assets', [$this, 'enqueue_editor_assets']);
    }

    /**
     * ブロックエディタ用のアセットを読み込む
     */
    public function enqueue_editor_assets() {
        // 投稿編集権限がない場合は読み込まない
        if (!current_user_can('edit_posts')) {
            return;
        }

        wp_enqueue_script(
            'multi-select-block-styles',
            plugin_dir_url(__FILE__) . 'assets/js/multi-select-block-styles.js',
            ['wp-blocks', 'wp-dom-ready', 'wp-edit-post', 'wp-hooks', 'wp-element', 'wp-components', 'wp-compose', 'wp-data', 'wp-block-editor'],
            '1.0.2',
            false
        );

        wp_enqueue_style(
            'multi-select-block-styles',
            plugin_dir_url(__FILE__) . 'assets/css/multi-select-block-styles.css',
            [],
            '1.0.2'
        );
    }
}

new Multi_Select_Block_Styles();
