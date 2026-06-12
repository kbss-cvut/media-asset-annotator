import * as Separator from '@radix-ui/react-separator';
import * as Tabs from '@radix-ui/react-tabs';
import { useEditor } from '../../context/editor/useEditor';
import { AssetInfo } from './assetInfo/AssetInfo.tsx';
import AnnotationList from './styleControls/annotationList/AnnotationList.tsx';
import StyleControls from './styleControls/StyleControls';
import { Tools } from './tools/Tools';
import type { CommandKey } from './commands/commands.items';
import { Commands } from './commands/Commands';
import { ErrorSnackbar } from '../snack/ErrorSnackbar.tsx';
import { SuccessSnackbar } from '../snack/SuccessSnackbar.tsx';
import { useSnackbar } from '../snack/useSnackbar.ts';
import { useMediaAsset } from '../../context/mediaAsset/useMediaAsset.ts';
import { usePlayback } from '../../context/playback/usePlayback.ts';

export const Toolbox = () => {
  const {
    annotations,
    selectedId,
    isEditing,
    isLocked,
    setIsLocked,
    freezeCurrentVisibility,
    restoreAutoVisibility,
    activeTool,
    setEditing,
    setActiveTool,
    selectAnnotation,
    updateAnnotation,
    commitAnnotation,
    removeSelected,
    undo,
    redo,
    save,
  } = useEditor();

  const selectedAnnotation = annotations.find((a) => a.id === selectedId) ?? null;
  const { snackbar, showSuccess, showError } = useSnackbar();
  const { asset } = useMediaAsset();
  const { cursor, duration } = usePlayback();

  const handleSave = async () => {
    save().then(
      () => {
        showSuccess('Annotations saved');
      },
      (e) => {
        console.log(e);
        showError(e instanceof Error ? e.message : 'Failed to save annotations');
      },
    );
  };

  const handleCommand = async (cmd: CommandKey) => {
    switch (cmd) {
      case 'edit':
        setEditing(!isEditing);
        return;

      case 'undo':
        undo();
        return;

      case 'redo':
        redo();
        return;

      case 'delete':
        removeSelected();
        return;

      case 'save':
        await handleSave();
    }
  };

  const handleToggleLock = () => {
    if (!isLocked) {
      freezeCurrentVisibility(cursor.t);
      setIsLocked(true);
    } else {
      restoreAutoVisibility();
      setIsLocked(false);
    }
  };

  return (
    <div className="relative bg-neutral-900 text-white flex flex-col h-full overflow-hidden">
      <Tabs.Root defaultValue="annotations" className="flex flex-col h-full min-h-0">
        <Tabs.List className="shrink-0 flex border-b border-neutral-700">
          <Tabs.Trigger
            value="asset"
            className="flex-1 px-4 py-3 font-semibold text-center text-neutral-400 data-[state=active]:text-white data-[state=active]:bg-neutral-800"
          >
            Asset
          </Tabs.Trigger>
          <Tabs.Trigger
            value="annotations"
            className="flex-1 px-4 py-3 font-semibold text-center text-neutral-400 data-[state=active]:text-white data-[state=active]:bg-neutral-800"
          >
            Annotations
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="asset" className="flex-1 min-h-0 overflow-y-auto">
          {asset && <AssetInfo asset={asset} duration={duration} />}
        </Tabs.Content>

        <Tabs.Content value="annotations" className="flex-1 min-h-0 flex flex-col">
          <div className="shrink-0 border-b border-neutral-700">
            <Commands isEditing={isEditing} onCommand={handleCommand} />
            <Tools activeTool={activeTool} isEditing={isEditing} onToolChange={setActiveTool} />
          </div>

          <div className="flex-1 min-h-0 border-b border-neutral-700">
            {selectedAnnotation && isEditing ? (
              <StyleControls
                asset={asset ?? undefined}
                annotation={selectedAnnotation}
                onChange={(patch) => updateAnnotation(selectedAnnotation.id, patch)}
                onCommit={commitAnnotation}
              />
            ) : (
              <div className="h-full flex items-center justify-center px-4 text-sm text-neutral-500 text-center">
                Enable edit mode and select an annotation to adjust its style.
              </div>
            )}
          </div>

          <Separator.Root className="h-px bg-neutral-700" />

          <div className="shrink-0 h-60">
            <AnnotationList
              annotations={annotations}
              isLocked={isLocked}
              onToggleLock={handleToggleLock}
              currentTime={cursor.t}
              selectedId={selectedId}
              onSelect={selectAnnotation}
              updateAnnotation={updateAnnotation}
            />
          </div>
        </Tabs.Content>
      </Tabs.Root>

      {snackbar?.type === 'success' && <SuccessSnackbar message={snackbar.message} />}
      {snackbar?.type === 'error' && <ErrorSnackbar message={snackbar.message} />}
    </div>
  );
};
