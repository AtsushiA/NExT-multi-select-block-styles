(function() {
    'use strict';

    /**
     * スタイルパネルを複数選択可能にする
     */
    function initMultiStyleSelector() {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) {
                        processStyleButtons(node);
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // 初期ロード時にも処理
        setTimeout(function() {
            processStyleButtons(document);
        }, 1000);
    }

    /**
     * スタイルボタンを処理
     */
    function processStyleButtons(container) {
        var styleButtons = container.querySelectorAll('.block-editor-block-styles__item');

        styleButtons.forEach(function(button) {
            // 既に処理済みの場合はスキップ
            if (button.dataset.multiStyleProcessed) {
                return;
            }
            button.dataset.multiStyleProcessed = 'true';

            // 新しいクリックハンドラーを設定
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();

                handleStyleButtonClick(button);
            }, true);
        });
    }

    /**
     * スタイルボタンのクリック処理
     */
    function handleStyleButtonClick(button) {
        var styleName = getStyleNameFromButton(button);
        if (!styleName) {
            return;
        }

        var select = wp.data.select('core/block-editor');
        var dispatch = wp.data.dispatch('core/block-editor');
        var selectedBlock = select.getSelectedBlock();

        if (!selectedBlock) {
            return;
        }

        var currentClassName = selectedBlock.attributes.className || '';
        var styleClass = 'is-style-' + styleName;

        // 現在のクラス名を配列に分割
        var classArray = currentClassName.split(' ').filter(function(c) {
            return c.trim() !== '';
        });

        // スタイルクラスの切り替え
        var styleIndex = classArray.indexOf(styleClass);

        if (styleIndex > -1) {
            // 既に存在する場合は削除
            classArray.splice(styleIndex, 1);
            button.classList.remove('is-active');
        } else {
            // 存在しない場合は追加
            classArray.push(styleClass);
            button.classList.add('is-active');
        }

        // 新しいクラス名を設定
        var newClassName = classArray.join(' ').trim();

        dispatch.updateBlockAttributes(selectedBlock.clientId, {
            className: newClassName || undefined
        });

        // UIを更新
        updateStyleButtonsUI(button.closest('.block-editor-block-styles'), classArray);
    }

    /**
     * ボタンからスタイル名を取得
     */
    function getStyleNameFromButton(button) {
        // ボタンのラベルテキストからスタイル名を推測
        var label = button.querySelector('.block-editor-block-styles__item-text');
        if (label) {
            var text = label.textContent.toLowerCase();
            // 一般的なスタイル名のマッピング
            var styleMap = {
                'default': 'default',
                'デフォルト': 'default',
                'display': 'display',
                'subtitle': 'subtitle',
                'annotation': 'annotation'
            };

            if (styleMap[text]) {
                return styleMap[text];
            }

            // その他のスタイル名はそのまま使用（スペースをハイフンに置換）
            return text.replace(/\s+/g, '-');
        }

        return null;
    }

    /**
     * スタイルボタンのUIを更新
     */
    function updateStyleButtonsUI(container, activeClasses) {
        if (!container) return;

        var buttons = container.querySelectorAll('.block-editor-block-styles__item');

        buttons.forEach(function(btn) {
            var styleName = getStyleNameFromButton(btn);
            if (styleName) {
                var styleClass = 'is-style-' + styleName;
                if (activeClasses.indexOf(styleClass) > -1) {
                    btn.classList.add('is-active');
                } else {
                    btn.classList.remove('is-active');
                }
            }
        });
    }

    // 選択ブロックが変更された時にUIを同期
    wp.data.subscribe(function() {
        var select = wp.data.select('core/block-editor');
        var selectedBlock = select.getSelectedBlock();

        if (selectedBlock) {
            var currentClassName = selectedBlock.attributes.className || '';
            var classArray = currentClassName.split(' ').filter(function(c) {
                return c.trim() !== '';
            });

            setTimeout(function() {
                var styleContainer = document.querySelector('.block-editor-block-styles');
                if (styleContainer) {
                    updateStyleButtonsUI(styleContainer, classArray);
                }
            }, 100);
        }
    });

    // 初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMultiStyleSelector);
    } else {
        initMultiStyleSelector();
    }

})();
